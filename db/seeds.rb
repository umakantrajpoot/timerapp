User.create(email: "testinguser@gmail.com", username: "demouser", first_name: "testing", last_name: "user", password: "12345678", password_confirmation: "12345678") if User.where(email: "testinguser@gmail.com").blank?
Membership.create(name: "Basic", amount: 0) if Membership.where(name: "Basic").blank?
Membership.create(name: "Pro", amount: 25) if Membership.where(name: "Pro").blank?
Membership.create(name: "Ultra", amount: 50) if Membership.where(name: "Ultra").blank?
