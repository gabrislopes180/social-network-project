import CreateGroupForm from "@/features/groups/create-group/ui/CreateGroupForm"
import GroupsWidget from "@/widgets/groupsWidget"

export default function Groups() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <section>Componente de grupos aqui</section> */}
      <GroupsWidget />
      <CreateGroupForm />
    </div>
  )
}
