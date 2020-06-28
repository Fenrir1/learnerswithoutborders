module Api
    module V1
      class TeachersController < ApplicationController
        skip_before_action :verify_authenticity_token

        def index
          teachers = Teacher.order('created_at DESC');
          render json: {status: 'SUCCESS', message:'Loaded teachers', data:teachers},status: :ok
        end
  
        def show
          teacher = Teacher.find(params[:id])
          render json: {status: 'SUCCESS', message:'Loaded teacher', data:teacher},status: :ok
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
          new_params = teacher_params.except(:picture, :documents)
          #new_params.merge(pictureath: 'public/uploads/'+uploaded_io.original_filename)
          #student = Student.new(new_params) 
          student = Teacher.new(
            new_params.merge(picturepath: new_file_name_full, documents: documents_json)
            
          )

          if student.save
            render json: {status: 'SUCCESS', message:'Saved teacher', data:student},status: :ok
          else
            render json: {status: 'ERROR', message:'teacher not saved', data:student.errors},status: :unprocessable_entity
          end
        end
  
        def destroy
          teacher = Teacher.find(params[:id])
          teacher.destroy
          render json: {status: 'SUCCESS', message:'Deleted teacher', data:teacher},status: :ok
        end
  
        def update
          teacher = Teacher.find(params[:id])
          if teacher.update_attributes(teacher_params)
            render json: {status: 'SUCCESS', message:'Updated teacher', data:teacher},status: :ok
          else
            render json: {status: 'ERROR', message:'Something whent wrong', data:teacher.errors},status: :unprocessable_entity
          end
        end
  
        private
  
        def teacher_params
          #params.permit!
          #params.require(:data)
          params.permit(  :email, 
                          :password, 
                          :picture,
                          
                          :firstname,
                          :middlename, 
                          :lastname,

                          :birthdate,
                          :contacts,      
                          :phone,
                          :address,
                          :city,
                          :country,

                          :nameToUseInClass, :backupPersonName, :backupPersonEmail, :backupPersonPhone, :backupPersonAddress, :backupPersonCountry, :backupPersonCity, :id
                                                  
                          )
          #permit(:email :password :pictureath :firstname :middlename :lastname :birthdate)
        end
      end
    end
  end
