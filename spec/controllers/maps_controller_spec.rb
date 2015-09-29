require 'rails_helper'

RSpec.describe MapsController, type: :controller do

  describe 'showing a map' do

    describe "GET #show" do

      it "works as normal" do
        get :show
        expect(response).to render_template :show
      end

    end

  end

end
