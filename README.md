# MEN-Project-2

Project Idea

Concept: A restaurant offering smoked and grilled meats with options for reservations and online orders.
Description: The “Smoked & Grilled” restaurant provides a unique dining experience by offering various smoked and grilled meat dishes. Visitors can browse the menu, make reservations, and place orders for pickup or delivery.

Data Models
ERD Overview
	•	User <> Reservation
	•	User <> Review <> MenuItem

B. Data Entities


MenuItem Entity
	•	MenuItemID: Unique identifier
	•	Name: Item name (e.g., Grilled Steak, Smoked Chicken)
	•	Description: Item description
	•	Price: Item price


Review Entity
	•	ReviewID: Unique identifier for the review
	•	UserID: Foreign key from User
	•	MenuItemID: Foreign key from MenuItem
	•	Rating: Rating (1-5)
	•	Comment: Text comment from the user


User Stories

As a visitor, I want to be able to view the menu so I can see the available smoked and grilled meat options.
As a user, I want to create an account so I can make reservations and order food online.
As a user, I want to add items to my order so I can select the dishes and quantities I want.
As a visitor, I want to leave reviews for the dishes I tried so I can help others decide on menu items.
As a user, I want to view my past orders so I can reorder or review my previous selections.
