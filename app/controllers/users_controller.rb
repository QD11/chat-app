class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def create 
        new_user = User.create(user_params)
        if new_user.valid?
            render json: new_user, status: :created
        else
            render json: { errors: new_user.errors }, status: :unprocessable_entity
        end
    end

    private 

    def user_params
        params.permit(:name, :email, :password)
        # params.permit(:name, :password)
    end
end
