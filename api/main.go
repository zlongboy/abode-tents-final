package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

func main() {
	port := fmt.Sprintf(":%v", os.Getenv("SERVER_PORT"))
	fmt.Printf("Starting server on %v \n", port)
	log.Fatal(http.ListenAndServe(port, router()))
}

func router() http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowCredentials: true,
	}))

	r.Get("/products/health", Health)
	r.Get("/products", GetProducts)
	r.Post("/products/search", GetProducts)
	r.Get("/products/filter", GetProducts)

	return r
}
