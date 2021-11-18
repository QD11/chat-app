class SessionsController < ApplicationController
    def create #login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id #authenticating 
            render json: user
        else 
            render json: { errors: "Invalid username or password. Please try again."}, status: :unauthorized
        end
    end 

    def destroy #logging out
        session.delete :user_id 
        head :no_content
    end
end
