class Document < ApplicationRecord
  belongs_to :user, polymorphic: true
end
