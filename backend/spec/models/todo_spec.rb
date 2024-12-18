require 'rails_helper'

RSpec.describe Todo, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
  end

  describe 'scopes' do
    let!(:completed_todo) { create(:todo, completed: true) }
    let!(:pending_todo) { create(:todo, completed: false) }

    describe '.completed' do
      it 'returns only completed todos' do
        expect(Todo.completed).to include(completed_todo)
        expect(Todo.completed).not_to include(pending_todo)
      end
    end

    describe '.pending' do
      it 'returns only pending todos' do
        expect(Todo.pending).to include(pending_todo)
        expect(Todo.pending).not_to include(completed_todo)
      end
    end
  end
end