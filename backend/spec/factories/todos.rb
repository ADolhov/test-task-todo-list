FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.sentence }
    completed { false }
  end
end