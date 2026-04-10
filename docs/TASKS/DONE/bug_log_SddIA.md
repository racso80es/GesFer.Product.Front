# objetivo: Asegurar que solo se modifica SddIA/evolution/Evolution_log en los casos en los que hagan modificaciones sobre la carpeta ./SddIA.
# Descripción : Es posible que alguna configuracion dentro de ./SddIA esté incorrectamente informada o se malinterprete por la IA, ya que en cirtas circunstancias se modifca el fichero indicado sin causa justificada.
## analizar contenido ./SddIA en busca de la posible causa.
## Conultar ./SddIA/evolution/Evolution_log para ampliar contexto del origen del comportamiento.
## El registro de logs genérico (feura de cambios en SddIA, se ha de registrar en /docs/evolution/EVOLUTION_LOG.md

# Resolución
Se ha movido el fichero `docs/EVOLUTION_LOG.md` a `docs/evolution/EVOLUTION_LOG.md` para alinear el repositorio con la configuración de Cúmulo (`paths.evolutionPath`).
Se han corregido menciones hardcodeadas en `SddIA/actions/finalize/spec.md` para que apunten a la ruta correcta.
Se reitera la regla: cuando los cambios ocurren en el contexto de SddIA, se deben registrar en `SddIA/evolution/Evolution_log.md` (`paths.sddiaEvolutionPath`), mientras que los cambios genéricos o de producto van a `docs/evolution/EVOLUTION_LOG.md` (`paths.evolutionPath`).
