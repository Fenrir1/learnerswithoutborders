# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_28_081728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "documents", force: :cascade do |t|
    t.string "documentname"
    t.string "documentpath"
    t.string "user_type", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_type", "user_id"], name: "index_documents_on_user_type_and_user_id"
  end

  create_table "students", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "password"
    t.string "picturepath"
    t.string "firstname"
    t.string "middlename"
    t.string "lastname"
    t.string "birthdate"
    t.string "firstNameOfParent"
    t.string "lastNameOfParent"
    t.string "emailOfParents"
    t.string "contacts"
    t.string "testResults"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teachers", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "password"
    t.string "picturepath"
    t.string "firstname"
    t.string "middlename"
    t.string "lastname"
    t.string "birthdate"
    t.string "phone"
    t.string "address"
    t.string "city"
    t.string "country"
    t.string "contacts"
    t.string "nameToUseInClass"
    t.string "backupPersonName"
    t.string "backupPersonEmail"
    t.string "backupPersonPhone"
    t.string "backupPersonAddress"
    t.string "backupPersonCountry"
    t.string "backupPersonCity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
