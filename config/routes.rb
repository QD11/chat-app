# config/routes.rb
Rails.application.routes.draw do
  resources :users
  resources :messages
  resources :memberships
  resources :teams, only: [:index]
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  mount ActionCable.server => '/cable'
  get "/:user_id/teams/", to: "teams#teams_specific_to_users"
  get "/:user_id/teams/messages", to: "messages#messages_specific_to_users"
  get "/:user_id/memberships", to: "memberships#memberships_specific_to_users"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end