NewsReader::Application.routes.draw do
  namespace :api do
    resources :feeds, only: [:index, :create, :show] do
      resources :entries, only: [:index]
    end
  end

  namespace :api do
    get '/feeds/:id/insta_refresh', to: 'feeds#insta_show'
    
  end
  root to: "static_pages#index"
end
