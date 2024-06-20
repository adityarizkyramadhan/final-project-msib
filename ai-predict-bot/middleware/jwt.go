package middleware

import (
	"a21hc3NpZ25tZW50/utils"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"strings"
)

// Your JWT secret

func JWTMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Ambil dari cookie
		token, err := ctx.Cookie("token")
		if token == "" {
			utils.ErrorResponse(ctx, http.StatusUnauthorized, errors.New("token not found"))
			ctx.Abort()
			return
		}
		token = strings.Replace(token, "Bearer ", "", 1)
		claims, err := verifyJWT(token)
		if err != nil {
			utils.ErrorResponse(ctx, http.StatusUnauthorized, err)
			ctx.Abort()
			return
		}
		ctx.Set("user", claims)
		ctx.Next()
	}
}

func verifyJWT(tokenString string) (interface{}, error) {
	var secretKey = os.Getenv("SECRET_KEY")
	if secretKey == "" {
		return nil, errors.New("SECRET_KEY environment variable not set")
	}
	var jwtSecret = []byte(secretKey)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["id"]
		return userID, nil
	}

	return nil, errors.New("Invalid token")
}
