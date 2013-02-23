class StagesController < ApplicationController
  def index
  	@stages = Stage.all
  	respond_with @stages
  end

  def show
  	@stage = Stage.find( params[:id] )
  	respond_with @stage
  end

  def update
  	@stage = Stage.find( params[:id] )
  	@stage.update_attributes( params[:stage] )
  	respond_with @stage
  end
end
