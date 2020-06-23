# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200620154814) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "students", force: :cascade do |t|
    t.string   "email"
    t.string   "password"
    t.string   "picturepath"
    t.string   "firstname"
    t.string   "middlename"
    t.string   "lastname"
    t.string   "birthdate"
    t.string   "firstNameOfParent"
    t.string   "lastNameOfParent"
    t.string   "emailOfParents"
    t.string   "contacts"
    t.string   "testResults"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "email"
    t.string   "password"
    t.string   "picturepath"
    t.string   "firstname"
    t.string   "middlename"
    t.string   "lastname"
    t.string   "birthdate"
    t.string   "phone"
    t.string   "address"
    t.string   "city"
    t.string   "country"
    t.string   "contacts"
    t.string   "nameToUseInClass"
    t.string   "documents"
    t.string   "backupPersonName"
    t.string   "backupPersonEmail"
    t.string   "backupPersonPhone"
    t.string   "backupPersonAddress"
    t.string   "backupPersonCountry"
    t.string   "backupPersonCity"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

end
