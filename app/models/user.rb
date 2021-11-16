class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :memberships
    has_many :teams, through: :messages

    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

end


