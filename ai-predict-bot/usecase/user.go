package usecase

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repositories"
	"a21hc3NpZ25tZW50/utils"
	"golang.org/x/crypto/bcrypt"
)

type (
	UserUsecase interface {
		Login(arg model.UserLogin) (interface{}, error)
		Register(arg model.UserRegister) (interface{}, error)
		GetByID(id uint) (model.UserResponse, error)
		Update(id uint, arg model.UserRegister) (interface{}, error)
		Delete(id uint) error
	}

	userUsecase struct {
		userRepo repositories.UserRepository
	}
)

func NewUserUsecase(userRepo repositories.UserRepository) UserUsecase {
	return &userUsecase{userRepo}
}

func (u *userUsecase) Login(arg model.UserLogin) (interface{}, error) {
	user, err := u.userRepo.FindByUsername(arg.Username)
	if err != nil {
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(arg.Password))
	if err != nil {
		return nil, err
	}

	token, err := utils.GenerateToken(user.ID, user.Username)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func (u *userUsecase) Register(arg model.UserRegister) (interface{}, error) {
	user := arg.ToModel()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user.Password = string(passwordHash)
	user, err = u.userRepo.Create(user)
	if err != nil {
		return nil, err
	}

	return user.ToResponse(), nil
}

func (u *userUsecase) GetByID(id uint) (model.UserResponse, error) {
	user, err := u.userRepo.FindByID(id)
	if err != nil {
		return model.UserResponse{}, err
	}

	return user.ToResponse(), nil
}

func (u *userUsecase) Update(id uint, arg model.UserRegister) (interface{}, error) {
	user, err := u.userRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	user.Username = arg.Username
	user.Password = arg.Password
	user.FullName = arg.FullName
	user, err = u.userRepo.Update(user)
	if err != nil {
		return nil, err
	}

	return user.ToResponse(), nil
}

func (u *userUsecase) Delete(id uint) error {
	return u.userRepo.Delete(id)
}
