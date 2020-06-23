module Api
    module V1
      class StudentsController < ApplicationController
        skip_before_action :verify_authenticity_token

        def index
          students = Student.order('created_at DESC');
          render json: {status: 'SUCCESS', message:'Loaded students', data:students},status: :ok
        end
  
        def show
          student = Student.find(params[:id])
          render json: {status: 'SUCCESS', message:'Loaded student', data:student},status: :ok
        end
  
        def create

          folder_name = params[:firstname]+params[:middlename]+params[:lastname]+params[:birthdate]
                   
          if(params.has_key?(:picture))
            #uploaded_io = params[:data][:picture]
              uploaded_io = params[:picture]
              new_file_name = 'picture.'+uploaded_io.original_filename.split('.').last
              new_file_name_full = 'public/uploads/'+folder_name+'/'+new_file_name
  
              dir = File.dirname("#{Rails.root}/public/uploads/#{folder_name}/#{new_file_name}")
              FileUtils.mkdir_p(dir) unless File.directory?(dir)
  
              File.open(Rails.root.join('public', 'uploads', folder_name, new_file_name), 'wb') do |file|
                file.write(uploaded_io.read)
              end
            else
              new_file_name_full = nil
            end

          #student = Student.new(student_params)
          new_params = student_params.except(:picture)
          #new_params.merge(pictureath: 'public/uploads/'+uploaded_io.original_filename)
          #student = Student.new(new_params) 
          student = Student.new(
            new_params.merge(picturepath: new_file_name_full)
          )

          if student.save
            render json: {status: 'SUCCESS', message:'Saved student', data:student},status: :ok
          else
            render json: {status: 'ERROR', message:'student not saved', data:student.errors},status: :unprocessable_entity
          end
        end
  
        def destroy
          student = Student.find(params[:id])
          student.destroy
          render json: {status: 'SUCCESS', message:'Deleted student', data:student},status: :ok
        end
  
        def update
          student = Student.find(params[:id])
          if student.update_attributes(student_params)
            render json: {status: 'SUCCESS', message:'Updated student', data:student},status: :ok
          else
            render json: {status: 'ERROR', message:'Article not student', data:student.errors},status: :unprocessable_entity
          end
        end
  
        private
  
        def student_params
          #params.permit!
          #params.require(:data)
          params.permit(:email, 
                          :password, 
                          :picture,
                          
                          :firstname,
                          :middlename, 
                          :lastname,

                          :birthdate,
                          :firstNameOfParent,
                          :lastNameOfParent,
                          :emailOfParents,
                          :contacts                      
                          
                          )
          #permit(:email :password :pictureath :firstname :middlename :lastname :birthdate)
        end
      end
    end
  end
