class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy, :toggle_complete]

  # GET /api/v1/todos
  def index
    @todos = Todo.all

    # Filter by status
    @todos = case params[:status]
    when 'completed'
      @todos.completed
    when 'pending'
      @todos.pending
    else
      @todos
    end

    # Pagination
    @todos = @todos.page(params[:page]).per(per_page) # Requires kaminari gem

    render json: @todos
  end

  # GET /api/v1/todos/1
  def show
    render json: @todo
  end

  # POST /api/v1/todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/todos/1
  def destroy
    @todo.destroy
    head :no_content
  end

  # PATCH /api/v1/todos/1/toggle_complete
  def toggle_complete
    @todo.update(completed: !@todo.completed)
    render json: @todo
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :completed)
  end
end
