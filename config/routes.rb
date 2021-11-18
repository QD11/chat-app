# config/routes.rb
Rails.application.routes.draw do
  resources :users
  resources :messages
  resources :memberships
  resources :teams
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  mount ActionCable.server => '/cable'
  get "/:user_id/teams/", to: "teams#teams_messages_specific_to_users"
end