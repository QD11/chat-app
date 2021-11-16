class SessionsController < ApplicationController
    def create #login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[user] = user.id
            render json: user
        else 
            render json: { errors: "Invalid username or password"}, status: :unauthorized
        end
    end 

    def destroy #logging out
        session.delete :user_id 
        head :no_content
    end
end