Rails.application.routes.draw do
  root 'pages#index'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  #get '/logged_in', to: 'sessions#is_logged_in?'

  namespace :api do
    namespace :v1 do
      resources :students
      resources :teachers
    end
  end

  get '*path', to: 'pages#index'

end
