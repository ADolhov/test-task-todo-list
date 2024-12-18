require 'rails_helper'

RSpec.describe Api::V1::TodosController, type: :controller do
  describe 'GET #index' do
    let!(:todos) { create_list(:todo, 3) }

    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end

    it 'returns all todos' do
      get :index
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe 'GET #show' do
    let(:todo) { create(:todo) }

    it 'returns a successful response' do
      get :show, params: { id: todo.id }
      expect(response).to be_successful
    end

    it 'returns the requested todo' do
      get :show, params: { id: todo.id }
      expect(JSON.parse(response.body)['id']).to eq(todo.id)
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) { { todo: { title: 'New Todo' } } }
    let(:invalid_attributes) { { todo: { title: '' } } }

    context 'with valid parameters' do
      it 'creates a new todo' do
        expect {
          post :create, params: valid_attributes
        }.to change(Todo, :count).by(1)
      end

      it 'returns a successful response' do
        post :create, params: valid_attributes
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new todo' do
        expect {
          post :create, params: invalid_attributes
        }.not_to change(Todo, :count)
      end

      it 'returns an error response' do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH #update' do
    let(:todo) { create(:todo) }
    let(:valid_attributes) { { id: todo.id, todo: { title: 'Updated Title' } } }
    let(:invalid_attributes) { { id: todo.id, todo: { title: '' } } }

    context 'with valid parameters' do
      it 'updates the todo' do
        patch :update, params: valid_attributes
        todo.reload
        expect(todo.title).to eq('Updated Title')
      end

      it 'returns a successful response' do
        patch :update, params: valid_attributes
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not update the todo' do
        original_title = todo.title
        patch :update, params: invalid_attributes
        todo.reload
        expect(todo.title).to eq(original_title)
      end

      it 'returns an error response' do
        patch :update, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:todo) { create(:todo) }

    it 'destroys the todo' do
      expect {
        delete :destroy, params: { id: todo.id }
      }.to change(Todo, :count).by(-1)
    end

    it 'returns a successful response' do
      delete :destroy, params: { id: todo.id }
      expect(response).to be_successful
    end
  end

  describe 'PATCH #toggle_complete' do
    let(:todo) { create(:todo, completed: false) }

    it 'toggles the completed status' do
      patch :toggle_complete, params: { id: todo.id }
      todo.reload
      expect(todo.completed).to be true

      patch :toggle_complete, params: { id: todo.id }
      todo.reload
      expect(todo.completed).to be false
    end

    it 'returns a successful response' do
      patch :toggle_complete, params: { id: todo.id }
      expect(response).to be_successful
    end
  end
end