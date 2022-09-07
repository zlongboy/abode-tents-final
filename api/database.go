package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jmoiron/sqlx"

	_ "github.com/go-sql-driver/mysql"
)

func readProducts(qc QueryConfig) []byte {
	cfg := DBConfig{"root", os.Getenv("MYSQL_ROOT_PASSWORD"), os.Getenv("MYSQL_HOST_PORT"), os.Getenv("MYSQL_DATABASE")}

	database := cfg.OpenDB()
	defer database.Close()

	results, err := database.Queryx(qc.constructQuery())
	if err != nil {
		log.Printf("Error executing query: %v", err.Error())
	}

	return parseResults(results)
}

func (qc QueryConfig) constructQuery() string {
	qc.Table = "products"
	var queryString string

	if len(qc.Brand) > 0 || len(qc.Capacity) > 0 {
		queryString = prepFilterQuery(qc)
	} else if len(qc.SKU) > 0 {
		queryString = fmt.Sprintf("SELECT * FROM %s WHERE sku = %s", qc.Table, qc.SKU)
	} else if len(qc.SearchTerm) > 0 {
		queryString = searchQuery(qc.SearchTerm, qc.Table)
	} else {
		queryString = fmt.Sprintf("SELECT * FROM %s WHERE active = TRUE", qc.Table)
	}
	return queryString
}

func prepFilterQuery(qc QueryConfig) string {
	inBrand := strings.Join(qc.Brand, "','")
	inCapacity := strings.Join(qc.Capacity, "','")

	if len(qc.Brand) > 0 && len(qc.Capacity) > 0 {
		return fmt.Sprintf("SELECT * FROM %s WHERE brand IN('%s') AND capacity IN('%s')", qc.Table, inBrand, inCapacity)
	} else if len(qc.Brand) > 0 {
		return fmt.Sprintf("SELECT * FROM %s WHERE brand IN('%s')", qc.Table, inBrand)
	} else if len(qc.Capacity) > 0 {
		return fmt.Sprintf("SELECT * FROM %s WHERE capacity IN('%s')", qc.Table, inCapacity)
	} else {
		return fmt.Sprintf("SELECT * FROM %s WHERE active = TRUE", qc.Table)
	}
}

func searchQuery(search, table string) string {
	view := "tents_search"
	search = strings.ToLower(search)

	qs := fmt.Sprintf("SELECT * FROM %s WHERE sku IN(SELECT sku FROM %s WHERE searchable_text LIKE '%%%s%%')", table, view, search)
	return qs
}

func parseResults(rows *sqlx.Rows) []byte {
	var prods ProductResults
	for rows.Next() {
		var p Product
		err := rows.StructScan(&p)
		if err != nil {
			log.Printf("Error scanning query results: %v", err.Error())
		}
		prods.Results = append(prods.Results, p)
	}
	defer rows.Close()

	jsonProds, err := json.Marshal(prods)
	if err != nil {
		fmt.Printf("Error marshalling %v to JSON /n", prods)
	}

	return jsonProds
}

func (c DBConfig) OpenDB() *sqlx.DB {
	// db, err := sqlx.Open("mysql", fmt.Sprintf("root:%v@tcp(docker.for.mac.localhost:3306)/tents", c.Pass)) // Troubleshooting for Docker
	db, err := sqlx.Open("mysql", fmt.Sprintf("%v:%v@tcp(%v)/%v", c.User, c.Pass, c.HostPort, c.Name))
	if err != nil {
		panic(err.Error())
	}
	return db
}
