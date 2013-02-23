class ItemsController < ApplicationController

	def index
		respond_with Item.all
	end

	def create
		@item = Item.create( params[:item] )
		respond_with @item
	end

	def show
		@item = Item.find( params[:id] )
		respond_with @item
	end

	def update
		@item = Item.find( params[:id] )
		params[:item][:stage_id] = nil if params[:item][:stage_id].nil?
		@item.update_attributes( params[:item] )
		render :json => @item # respond 200 instead of 204
	end

	def destroy
		@item = Item.find( params[:id] )
		@item.destroy	
		respond_with @item
	end
end
