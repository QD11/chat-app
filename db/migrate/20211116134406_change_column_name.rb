class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :picture_url, :password_digest
  end
end
