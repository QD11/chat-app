# config/routes.rb
Rails.application.routes.draw do
  resources :messages
  resources :memberships
  resources :teams
  resources :users
  
  mount ActionCable.server => '/cable'
  get "/hello", to: "application#hello_world"
  get "/:user_id/teams", to: "teams#teams_specific_to_user"
end