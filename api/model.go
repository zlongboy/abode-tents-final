package main

import "encoding/json"

type DBConfig struct {
	User     string
	Pass     string
	HostPort string
	Name     string
}

type Product struct {
	SKU        string          `db:"sku" json:"sku"`
	Active     bool            `db:"active" json:"active"`
	Featured   bool            `db:"featured" json:"featured"`
	Brand      string          `db:"brand" json:"brand"`
	Name       string          `db:"name" json:"name"`
	Images     json.RawMessage `db:"images" json:"images"`
	URL        string          `db:"url" json:"url"`
	Price      float64         `db:"price" json:"price"`
	Capacity   int             `db:"capacity" json:"capacity"`
	Season     string          `db:"season" json:"season"`
	Weight     int             `db:"weight" json:"weight"`
	FloorArea  int             `db:"floor_area" json:"floorArea"`
	Color      string          `db:"color" json:"color"`
	Score      int             `db:"score" json:"score"`
	Highlights json.RawMessage `db:"highlights" json:"highlights"`
	Keywords   json.RawMessage `db:"keywords" json:"keywords"`
}

type ProductResults struct {
	Results []Product `json:"results"`
}

type QueryConfig struct {
	Table      string
	SKU        string
	Brand      []string
	Capacity   []string
	SearchTerm string
}
