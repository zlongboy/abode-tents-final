package main

import (
	"net/http"
)

func Health(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("SERVER IS RUNNING"))
}

func GetProducts(w http.ResponseWriter, r *http.Request) {
	params := parseParams(r)
	buildResponse(w, http.StatusOK, readProducts(params))
}

func buildResponse(w http.ResponseWriter, status int, body []byte) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(body)
}

func parseParams(r *http.Request) QueryConfig {
	var params QueryConfig

	params.SKU = r.URL.Query().Get("sku")
	params.SearchTerm = r.URL.Query().Get("q")
	params.Brand = r.URL.Query()["brand"]
	params.Capacity = r.URL.Query()["capacity"]

	return params
}
