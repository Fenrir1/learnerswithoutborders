class Student < ApplicationRecord
    has_many :document, as: :user

    def as_json(**options)
        unless options.has_key? :include
          options.merge!(include: [:document])
        end
        super(options)
      end      
end
