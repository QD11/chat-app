class User < ApplicationRecord
    has_secure_password
    has_many :messages, dependent: :destroy
    has_many :memberships, dependent: :destroy
    has_many :teams, through: :memberships

    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

end


