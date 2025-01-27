# Appointment Booking: Clean Architecture

In this README, I am going to discuss briefly some of the architectural and technical decisions taken while implementing this module.

## Integration methods
- Integration with the doctor availability module is done via **direct calls**
- Integration with the appointment confirmation module is done via **publishing to an event bus**
- Integration with the doctor appointment management module is done via **direct calls**

## Adapters vs Infra

A questions that may directly come to the viewer mind is "What is the difference here between infra and adapters?"

Adapters layers here is influenced by the "Interface Adapters" layer in clean architecture, Where it's main responsibility is to transfer data from the outside to the application layer and vice versa by mapping or "Adapting" the sent and received data.

In the course the Adapters layer was not mentioned that much and most of it's component in my code base here were usually placed in the infrastructure layer (and api folder which is not typically a logical layer and we can argue that it follows into the adapters layers). So as conclusion to my decisions, I believe that adapters folder here can be mapped to the infra folder that was seen multiple times in the course and even I think that the "Repositories" places in infra layer can be moved also in the adapters layer leaving the infra folder empty and hence thinking about the last layer in clean architecture as the external frameworks, DB, web, etc. **Which has not actual representation in the code**

## Appointment vs AppointmentBooking

We decided to have two different domain models. AppointmentBooking which should hold relative information to the booking itself (e.g. reservation time, device that the appointment was reserved from, payment method, etc. However, many of those were not a requirement so we skipped them) and the Appointment which represent the actual appointment in the system which the doctor can interact with (view, change status, etc.)

After and AppointmentBooking is created and saved in the module in memory database, associated slot is reserved and the confirmation is sent, a direct call is conducted to the **Doctor Appointment Management** module to create the Appointment.

Another important point that derived this decision is that usage of the booking data can be noticeably different from the usage of the appointment data (e.g. add recommendation system, analysis and data science tasks, etc.) and that what pushed us more to take such decision for the sake of future scalability. **However**, we also thought that is make much since to merge the two module (Appointment Booking and Doctor Appointment Management), and hence we would have only one domain model since the required system specification are not that large or complicated, but we did not take that path since the requirements of the assignment explicitly specified that we should have 4 modules.




## View available slots is only calling DoctorAvailability module?

In the requirements, it was stated that the Appointment Booking module is the one which should provide the functionality of listing all available slots. **However**, the doctor availability module is the one who has the Slot domain model implementation and the one responsible of storing in the database and hence more access to how to fetch such information (fetching slots that satisfy the availability conditions from the database) and overall the coupling of the doctor availability module with the Slots and their retrieval is hard to avoid.

So we deiced to place the logic of deciding which slot should be available and on what conditions in the Doctor Availability module. In other words, the Appointment Booking module is the one exposing the http endpoint for getting the available slots, because that is the task requirement, but behind the scene, the module is performing a direct call to the Doctor Availability module to get such data.

To convince you with such a decision, imagine that you placed the availability of a slot logic in the Appointment Booking module and for simplicity now it only consist of fetching slots that are not reserved. However, you would still need to make a direct call to the doctor availability, but this time maybe you expose a method that is provided with arguments to the proper filtering specified by the Appointment Booking module (for our case, it's just having `isReserved=false`) and then the Doctor Availability module would take these arguments and do the actual database filtering in it's repository by using `where` clause, for example.

Now imagine that the business logic changed, and an available slot is now the slot that is not reserved and also it's timing is one earlier than the time it may be reserved at. Of course, you will change that logic in the Appointment Booking module, but here is the catch. You are now using another attribute of the Slot model which is the `slotTime` and hence you will to change the fetching mechanism and signature of the exposed api methods of the Doctor Availability module and here you are creating unnecessary coupling while you can place all of the logic (policy) and the mechanisms in one module having a single responsibility, which should be the Doctor Availability module

> [!note] Alos the module's name is doctor **AVAILABILITY**, so it makes sense it's is the one which should decide what is available and what is not 😂