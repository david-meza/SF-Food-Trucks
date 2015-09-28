Rails.application.routes.draw do
  root to: 'maps#show'

  scope :api do
    scope :v1 do
      resources :foodtrucks, only: [:index]
    end
  end

end
