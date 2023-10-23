import RoomID from "@/components/Interface/Room/ID";

export default function RoomIDPage({ params }: { params: { id: string } }) {
    return <RoomID roomID={params.id} />;
}
