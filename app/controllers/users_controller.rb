class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    def index
        render json: User.all
    end

    def show
        # user = User.find_by(id: session[:user_id])
        # if user
        #     render json: user, status: :ok
        # else
        #     render json: { error: "Not authorized" }, status: :unauthorized
        # end
        render json: @current_user
    end

    def create 
        # new_user = User.create(user_params)
        # if new_user.valid?
        #     render json: new_user, status: :created
        # else
        #     render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity
        # end
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user
    end

    private 

    def user_params
        params.permit(:name, :email, :password)
        # params.permit(:name, :password)
    end
end
