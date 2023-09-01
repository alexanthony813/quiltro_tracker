![IMG_0861](https://github.com/alexanthony813/quiltro_tracker/assets/84674340/f037872a-a4b9-4615-9ff7-517680869852)
![Quiltro Tracker Espangolo](https://github.com/alexanthony813/quiltro_tracker/assets/84674340/9e485364-043d-4ec8-8b85-f52fe640a62e?raw=true)

Demo: https://youtu.be/WCPtwA_igzw

Trello: https://trello.com/b/JKABN1I4/quiltros

React Native frontend: https://quiltro-44098.web.app/64eced304e479cd61c12c040

Node/Express backend: https://quiltro-637d7.web.app/

API repo https://github.com/alexanthony813/amigos_perdidos_api

![IMG_0861](https://github.com/alexanthony813/quiltro_tracker/assets/84674340/5d025edd-cccd-4451-aa53-73759a5d4375?raw=true)


Chile, al menos en lo que he visto durante mi tiempo en Santiago y Valparaíso, tiene una maravillosa y única cultura de construir casitas para perros callejeros y cuidar de ellos como comunidad. Durante mi tiempo como voluntario en un refugio de perros en Santiago, aprendí que esta cultura está creciendo junto con una cultura de mascotas más vibrante. Quería hacer algo fuera de mi tiempo en ese refugio para proporcionar una herramienta a las personas que gestionan estas casitas.

El flujo general será:
0. Un administrador creará una cuenta con un número de teléfono verificado.
1. Un administrador creará un perfil para su perro.
2. Un administrador colocará un código QR a la casita del perro.
3. Luego podrán contar con el componente de integración de WhatsApp para:
  a) recibir notificaciones sobre problemas/emergencias.
  b) recibir solicitudes de adopción si lo configuran como una opción durante la creación del perfil.
  c) evitar poner su número de teléfono directamente en la casita del perro, utilizando las fotos verificadas informadas sobre los problemas.
  d) contar con los seguidores de sus perros para verificar problemas si están lejos.
4. Los usuarios anónimos pueden escanear códigos QRs y denunciar problemas de forma anónima si suben una foto del problema para demostrar que no es una broma.
5. Los usuarios anónimos pueden convertirse en cuentas verificadas (no administradores) para:
  a) seguir a perros individuales y recibir actualizaciones sobre problemas a través de WhatsApp.
  b) confirmar/negar la existencia de problemas o solucionar problemas si son menores y subir una foto para permitir que el administrador sepa si aún está pendiente.
  c) preguntar sobre adopción o cuidado temporal, especialmente durante la temporada de invierno/lluvias para perros mayores.

Funciones pausadas/descontinuadas:
1. Originalmente, quería crear una función similar a GoFundMe que permitiera a los administradores solicitar ayuda para gastos mayores. He visto a muchas personas gastar dinero en golosinas y estoy seguro de que estarían dispuestas a donar un poco por algo mas urgente si hubiera un sistema transparente en su lugar. Sin embargo, esto es demasiado complicado desde una perspectiva de confianza y no quiero alejar a los usuarios potenciales cuando vean que hay dinero involucrado.
2. Después de darme cuenta de que las donaciones eran demasiado complejas, me di cuenta de que podríamos permitir que un administrador tenga una lista de artículos solicitados si los usuarios desean traerlos. Sin embargo, ahora estoy diciendo a los administradores que simplemente pueden poner esto en la descripción. Entre los campos para comidas favoritas, alergias, comidas venenosas y la descripción general, creo que hemos permitido a los administradores educar mejor a la comunidad bien intencionada sobre cómo pueden ayudar a cuidar de sus perros.

___

ENGLISH TRANSLATION

Chile, at least in what I've seen during my time in Santiago and Valparaiso, has a wonderful and unique culture of building houses for stray dogs and caring for them as a community. In my time volunteering with a dog shelter in Santiago I've learned that this culture is only growing along with a more vibrant pet culture. I wanted to do something outside of my time in that shelter to give a tool to the people who run these casitas.

The general flow will be:
0. An admin will create an account with a verified phone number
1. An admin will create a profile for their dog
2. An admin will attach a QR code to the dog's house
3. They can then rely on the Whatsapp integration component in order to:
  a) receive notifications regarding problems/emergencies
  b) receive solicitations for adoption if they configure that as an option during profile creation
  c) avoid putting their phone number directly on the dog house, using the verified photos reported on the problems
  d) rely on the followers of their dogs to verify problems if they are far away
4. anonymous users can scan QR codes and anonymously report problems if they upload a picture of the issue to prove that it isn't a prank
5. anonymous users can convert to verified (non-admin) accounts in order to:
  a) follow individual dogs to receive updates on problems via Whatsapp
  b) confirm/deny that problems exist, or fix the problems if they are minor and upload a picture to allow the admin to know whether it is still outstanding
  c) inquire about adoption or fostering, especially during the winter/rainy season for older dogs


Paused/discontinued features:
1. Originally I wanted to create a gofundme like feature that would allow admins to solicit help for larger expenses. I've seen many people spend money on treats and I'm sure they would be willing to donate a bit for something more urgent if there was a transparent system in place. However this is just too complicated from a trust perspective and I don't want to turn away would be users when they see that money is involved.
2. After realizing that donations were too complex, I realized that we could just allow an admin to have a list of requested items if users wanted to bring them. However, I'm now telling admins that they can just put this in the description. Between the fields for favorite foods, allergies, foods that are poisonous, and the catch-all description, I think we have enabled the admins to better educate the well-meaning community on how they can help take care of their dogs.



