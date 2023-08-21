
![QuiltroFlow](https://github.com/alexanthony813/quiltro_tracker/assets/84674340/918832ad-03cb-4a0d-9554-e8e2d1ff4757)

Demo here: https://www.youtube.com/watch?v=HSD7SpSLJ4o
React Native frontend deployed here: https://quiltro-44098.web.app/
Node/Express backend deployed here: https://quiltro-637d7.web.app/
Here is the API repo https://github.com/alexanthony813/amigos_perdidos_api

Chile, at least in what I've seen during my time in Santiago and Valparaiso, has a wonderful and unique culture of building houses for stray dogs and caring for them as a community. In my time volunteering with a dog shelter in Santiago I've learned that this culture is only growing along with a more vibrant pet culture. I wanted to do something outside of my time in that shelter to give a tool to the people who run these casitas.

The general flow will be:
0. An admin will create an account with a verified phone number
1. An admin will create a profile for their dog, outlining allergies and automatically showing other users what they can't eat.
2. An admin will attach a QR code to the house
3. They can then forget about this page and rely on the Whatsapp integration component in order to:
  a) receive notifications regarding problems/emergencies
  b) receive solicitations for adoption if they configure that as an option during profile creation
  c) avoid putting their phone number directly on the dog house, using the verified photos reported on the problems
  d) rely on the followers of their dogs to verify problems if they are far away
4. regular users can scan QR codes and anonymously report problems if they upload a picture of the issue to prove that it isn't a prank
5. regular users can convert to verified (still non-admin) accounts in order to:
  a) follow individual dogs to receive updates on problems via Whatsapp
  b) confirm/deny that problems exist, or fix the problems if they are minor and upload a picture to allow the admin to know whether it is still outstanding
  c) inquire about adoption or fostering, especially during the winter/rainy season for older dogs


Paused/discontinued features:
1. Originally I wanted to create a gofundme like feature that would allow admins to solicit help for larger expenses. I've seen many people spend money on treats and I'm sure they would be willing to donate a bit if there was a transparent system in place. However this is just too complicated from a trust perspective and I don't want to turn away would be users when they see that money is involved.
2. After realizing that donations were too complex, I realized that we could just allow an admin to have a list of requested items if users wanted to bring them. However, I'm now telling admins that they can just put this in the description. Between the fields for favorite foods, allergies, foods that are poisonous, and the catch-all description, I think we have enabled the admins to better educate the well-meaning community on how they can help take care of their dogs.



