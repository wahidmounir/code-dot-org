require 'test_helper'

class AuthenticationOptionsControllerTest < ActionDispatch::IntegrationTest
  test 'connect: returns bad_request if user not signed in' do
    get '/users/auth/google_oauth2/connect'
    assert_response :bad_request
  end

  test 'connect: returns bad_request if user not migrated' do
    user = create :user, :unmigrated_facebook_sso
    sign_in user
    get '/users/auth/google_oauth2/connect'
    assert_response :bad_request
  end

  test 'connect: returns bad_request if provider not supported' do
    user = create :user, :multi_auth_migrated
    sign_in user
    get '/users/auth/some_fake_provider/connect'
    assert_response :bad_request
  end

  test 'connect: sets connect_provider on session and redirects to google authorization' do
    user = create :user, :multi_auth_migrated
    sign_in user

    Timecop.freeze do
      get '/users/auth/google_oauth2/connect'
      assert_equal 2.minutes.from_now, session[:connect_provider]
      assert_redirected_to '/users/auth/google_oauth2'
    end
  end

  test 'connect: sets connect_provider on session and redirects to facebook authorization' do
    user = create :user, :multi_auth_migrated
    sign_in user

    Timecop.freeze do
      get '/users/auth/facebook/connect'
      assert_equal 2.minutes.from_now, session[:connect_provider]
      assert_redirected_to '/users/auth/facebook'
    end
  end

  test 'connect: sets connect_provider on session and redirects to windowslive authorization' do
    user = create :user, :multi_auth_migrated
    sign_in user

    Timecop.freeze do
      get '/users/auth/windowslive/connect'
      assert_equal 2.minutes.from_now, session[:connect_provider]
      assert_redirected_to '/users/auth/windowslive'
    end
  end

  test 'connect: sets connect_provider on session and redirects to clever authorization' do
    user = create :user, :multi_auth_migrated
    sign_in user

    Timecop.freeze do
      get '/users/auth/clever/connect'
      assert_equal 2.minutes.from_now, session[:connect_provider]
      assert_redirected_to '/users/auth/clever'
    end
  end

  test 'connect: sets connect_provider on session and redirects to powerschool authorization' do
    user = create :user, :multi_auth_migrated
    sign_in user

    Timecop.freeze do
      get '/users/auth/powerschool/connect'
      assert_equal 2.minutes.from_now, session[:connect_provider]
      assert_redirected_to '/users/auth/powerschool'
    end
  end

  test 'disconnect: returns bad_request if user is not signed in' do
    delete '/users/auth/1/disconnect'
    assert_response :bad_request
  end

  test 'disconnect: returns bad_request if user is not migrated' do
    user = create :user, :unmigrated_facebook_sso
    sign_in user

    delete '/users/auth/1/disconnect'
    assert_response :bad_request
  end

  test 'disconnect: deletes the AuthenticationOption if it exists' do
    user = create :user, :multi_auth_migrated
    auth_option = create :authentication_option, user: user
    sign_in user

    assert_destroys(AuthenticationOption) do
      delete "/users/auth/#{auth_option.id}/disconnect"
      assert_response :success
      assert_raises ActiveRecord::RecordNotFound do
        AuthenticationOption.find(auth_option.id)
      end
    end
  end

  test 'disconnect: returns not_found if the AuthenticationOption does not exist' do
    user = create :user, :multi_auth_migrated
    sign_in user

    assert_does_not_destroy(AuthenticationOption) do
      delete "/users/auth/1/disconnect"
      assert_response :not_found
    end
  end

  test 'disconnect: returns not_found if the AuthenticationOption does not belong to the current user' do
    user = create :user, :multi_auth_migrated
    auth_option = create :authentication_option
    sign_in user

    assert_does_not_destroy(AuthenticationOption) do
      delete "/users/auth/#{auth_option.id}/disconnect"
      assert_response :not_found
    end
  end
end
