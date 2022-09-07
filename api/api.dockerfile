FROM golang:1.18-alpine AS build

WORKDIR /go/src/github.com/zlongboy/abode-tents-final/api

COPY . .
COPY go.mod ./
COPY go.sum ./
COPY .env ./
RUN go mod download


RUN go build -o server .

FROM alpine:3.15
EXPOSE 8080

COPY --from=build /go/src/github.com/zlongboy/abode-tents-final/api/server /server
CMD ["/server"]

