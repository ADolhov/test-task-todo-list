# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :todos do
        member do
          patch :toggle_complete
        end
      end
    end
  end
end
