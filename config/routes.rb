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
  get "/hello", to: "application#hello_world"
end