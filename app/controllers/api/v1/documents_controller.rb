module Api
    module V1
      class DocumentsController < ApplicationController
        skip_before_action :verify_authenticity_token

        def index
          documents = Document.order('created_at DESC');
          render json: {status: 'SUCCESS', message:'Loaded documents', data:documents},status: :ok
        end
  
        def show
          document = Document.find(params[:id])
          render json: {status: 'SUCCESS', message:'Loaded student', data:document},status: :ok
        end
  
        def create

            if (document_params[:user_type]=='Student')
                @user = Student.find_by(id: document_params[:user_id])
            elsif (document_params[:user_type]=='Teacher')
                @user = Teacher.find_by(id: document_params[:user_id])
            elsif (document_params[:user_type]=='manager')
                @user = Student.find_by(id: document_params[:user_id])
            end

          folder_name = @user.firstname+@user.middlename+@user.lastname+@user.birthdate
                   
          if(params.has_key?(:picture))
            #uploaded_io = params[:data][:picture]
              uploaded_io = params[:picture]
              new_file_name = uploaded_io.original_filename
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
          new_params = document_params.except(:picture)
          #new_params.merge(pictureath: 'public/uploads/'+uploaded_io.original_filename)
          #student = Student.new(new_params) 
          document = Document.new(
            new_params.merge(documentpath: new_file_name_full)
          )

          if document.save
            render json: {status: 'SUCCESS', message:'Saved document', data:document},status: :ok
          else
            render json: {status: 'ERROR', message:'document not saved', data:document.errors},status: :unprocessable_entity
          end
        end
  
        def destroy
            document = Document.find(params[:id])
            # delete file
            File.delete("#{Rails.root}/#{document.documentpath}")
            # delete row in DB
            document.destroy
            
          render json: {status: 'SUCCESS', message:'Deleted document', data:document},status: :ok
        end
  
          
        private
  
        def document_params
          #params.permit!
          #params.require(:data)
          params.permit(  :picture,                          
                          :documentname,
                          :user_id, 
                          :user_type                                             
                        )

        end
      end
    end
  end
