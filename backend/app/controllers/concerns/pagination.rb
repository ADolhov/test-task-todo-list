# frozen_string_literal: true

module Pagination
  extend ActiveSupport::Concern

  def page
    params[:page] || 1
  end

  def per_page
    params[:per_page] || 10
  end
end
