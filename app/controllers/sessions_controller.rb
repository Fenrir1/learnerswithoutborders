class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create

        if (session_params[:role]=='student')
            @user = Student.find_by(email: session_params[:email])
        elsif (session_params[:role]=='teacher')
            @user = Teacher.find_by(email: session_params[:email])
        elsif (session_params[:role]=='manager')
            @user = Student.find_by(email: session_params[:email])
        end
      
        if (@user && @user.password=session_params[:password])
          #login!
          render json: {
            logged_in: true,
            role: @user.class.name,
            user: @user
          }
        elsif (session_params[:role]=='manager') && (session_params[:password]=='password') && (session_params[:email]=='admin@admin.com')
          render json: {
            logged_in: true,
            role: 'manager',
            user: 'manager'
          }
        else
          render json: { 
            status: 401,
            errors: ['no such user', 'verify credentials and try again or signup']
          }
        end
      end

    def destroy
        logout!
        render json: {
          status: 200,
          logged_out: true
        }
      end

    private
    def session_params
        params.require(:user).permit(:role, :email, :password)
      end
    end