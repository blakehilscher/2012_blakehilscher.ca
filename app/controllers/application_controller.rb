class ApplicationController < ActionController::Base
  protect_from_forgery
  
  respond_to :html, :json
  
  rescue_from CanCan::AccessDenied do |exception|
    flash[:error] = exception.message
    redirect_to root_url
  end
  
end