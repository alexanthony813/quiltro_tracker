# Background

Quiltros, it’s not yesterday anymore

QuiltrosPerdidos seems ill-fated. There are already enough things for this and it could have turned into a forever project. Maybe creating a standardized webpage/forumn for Santiago would work, but it could just be a facebook page...

Regardless of whether QuiltrosPerdidos is revisited (it might make sense to do in the spring when the flyers go back up), going to learn from my mistakes to iterate quicker on this one.

# Mission

This is based on my experiences in Chile (Santiago, Viña del Mar, Puerto Natales...)

Quiltro is a stray dog. Sometimes the neighborhoods here collectively care for them, building casitas and bringing food and water with varying levels of consistency. I've noticed that many of them don't want treats, but really need other things like medicine, a new water bowl, new blankets....

This app will help by:

- Providing a profile of each quiltro (irregardless of whether they are condoned by their neighborhood and living in a casita)
- Authenticated admin will fill out profile. Hardest part of this will be locating the right person.
- QR code on the casita will connect take to the app, showing users more information about the quiltro.
- Pertinent Quiltro data:
  1. Name!
  2. Age
  3. Favorite foods
  4. Can't/won't eat
  5. Current Medications (this is big, i've been giving parasite medication for 3 months, would be great to track this)
  6. Most needed items
  7. Medical history (vet visits, surgeries, injuries)
  8. Medical issues/needs
  9. Nose ID (may not be MVP, will be useful in case lost)
  10. Chip ID (recent law requires chip but this is still not followed widely)
  11. Photo in S3
  12. casita location

Plan for refactoring:

- Admin view will be list of associated, with option to add one
- User view will always just be that one, and read only with MPV?
  - option to donate with call to action near medicine
  - report a problem (should require a photo)
- ENSURE ROUTES ARE WORKING
