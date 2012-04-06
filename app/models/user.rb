class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :password, :password_confirmation, :remember_me
  
  ROLES = %w[admin user]
    
  has_many :posts
    
  def admin?
    self.role == 'admin'
  end
    
  def user?
    self.role == 'user'
  end
  
end
