class UsersController < ApplicationController
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create 
        new_user = User.create(user_params)
        if new_user.valid?
            render json: new_user, status: :created
        else
            render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private 

    def user_params
        params.permit(:name, :email, :password)
        # params.permit(:name, :password)
    end
end
