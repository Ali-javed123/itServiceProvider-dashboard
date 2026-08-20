// components/teams/TeamsSection.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { useTeams } from '@/lib/hooks/useTeams';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { CreateTeamDialog } from './CreateTeamDialog';
import { EditTeamDialog } from './EditTeamDialog';
import type { Team } from '@/types/teams.types';

const TeamsSection = () => {
  const { teams, loading, isSubmitting, fetchTeams, createTeam, updateTeam, deleteTeam } = useTeams();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleCreate = async (values: any) => {
    const result = await createTeam(values)  as any;
    if (result.success) {
      setCreateDialogOpen(false);
    }
  };

  const handleUpdate = async (id: string, values: any) => {
    const result = await updateTeam(id, values) as any;
    if (result.success ) {
      setEditDialogOpen(false);
      setSelectedTeam(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    deleteTeam(id, name);
  };

  const openEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    // <>
    //   <section className="px-4 md:px-8 mt-6">
    //     <div className="max-w-4xl mx-auto">
    //       <div className="flex flex-col md:flex-row justify-between items-center md:mb-16 mb-12">
    //         <h2 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-slate-50">
    //           Meet our team
    //         </h2>
    //         <Button onClick={() => setCreateDialogOpen(true)} className="mt-4 md:mt-0">
    //           <FaPlus className="mr-2" /> Add Member
    //         </Button>
    //       </div>

    //       {teams.length === 0 ? (
    //         <p className="text-center text-gray-500 dark:text-gray-400">
    //           No team members yet. Click "Add Member" to get started.
    //         </p>
    //       ) : (
    //         <ul className="grid gap-4 mx-auto grid-cols-2 md:gap-6 md:grid-cols-3 sm:max-w-xl md:max-w-full">
    //           {teams.map((member) => (
    //             <li
    //               key={member._id}
    //               className="bg-white p-2 border border-slate-300 rounded-lg sm:p-3 dark:bg-neutral-900 dark:border-neutral-900 group relative"
    //             >
    //               <div className="bg-gray-50 aspect-square rounded-lg overflow-hidden dark:bg-neutral-700">
    //                 <img
    //                   src={member.image?.url || 'https://readymadeui.com/team-1.webp'}
    //                   className="w-full h-full object-cover object-top"
    //                   alt={member.title}
    //                 />
    //               </div>
    //               <div className="text-center mt-4 mb-1">
    //             <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
    //                   {member.title}
    //                 </h3>
    //                 <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
    //                   {member.designation}
    //                 </p>
    //               </div>

    //               {/* Action buttons - visible on hover or always visible on mobile */}
    //               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 dark:bg-neutral-800/80 p-1 rounded-md backdrop-blur-sm">
    //                 <button
    //                   onClick={() => openEditDialog(member)}
    //                   className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
    //                   title="Edit"
    //                 >
    //                   <FaEdit className="h-3.5 w-3.5" />
    //                 </button>
    //                 <button
    //                   onClick={() => handleDelete(member._id, member.title)}
    //                   className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
    //                   title="Delete"
    //                 >
    //                   <FaTrash className="h-3.5 w-3.5" />
    //                 </button>
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>
    //   </section>

    //   {/* Dialogs */}
    //   <CreateTeamDialog
    //     open={createDialogOpen}
    //     onOpenChange={setCreateDialogOpen}
    //     isSubmitting={isSubmitting}
    //     onCreateTeam={handleCreate}
    //   />

    //   <EditTeamDialog
    //     open={editDialogOpen}
    //     onOpenChange={setEditDialogOpen}
    //     team={selectedTeam}
    //     isSubmitting={isSubmitting}
    //     onUpdateTeam={handleUpdate}
    //   />
    // </>
    <>
 <section className="px-4 md:px-8 mt-6">
  <div className="max-w-5xl mx-auto">

    {/* =====================================================
        HEADER
    ===================================================== */}

    <div
      className="
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        mb-10
        md:mb-14
      "
    >
      <div className="text-center md:text-left">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            tracking-tight
            text-slate-900
            dark:text-slate-50
          "
        >
          Meet our team
        </h2>

        <p
          className="
            mt-2
            text-sm
            md:text-base
            text-slate-500
            dark:text-slate-400
          "
        >
          The talented people behind our work
        </p>

      </div>


      {/* =====================================================
          ADD MEMBER BUTTON
      ===================================================== */}

      <Button
        onClick={() => setCreateDialogOpen(true)}
        className="
          mt-5
          md:mt-0
          shadow-sm
          hover:shadow-lg
          hover:-translate-y-0.5
          transition-all
          duration-300
        "
      >
        <FaPlus className="mr-2" />
        Add Member
      </Button>

    </div>


    {/* =====================================================
        EMPTY STATE
    ===================================================== */}

    {teams.length === 0 ? (

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          min-h-[260px]
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-slate-50/70
          dark:bg-neutral-900/50
          dark:border-neutral-700
        "
      >

        <p
          className="
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          No team members yet.
        </p>

        <p
          className="
            mt-1
            text-sm
            text-gray-400
            dark:text-gray-500
          "
        >
          Click "Add Member" to get started.
        </p>

      </div>

    ) : (

      /* =====================================================
         TEAM GRID
      ===================================================== */

      <ul
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          gap-4
          md:gap-6
        "
      >

        {teams.map((member) => {

          const imageUrl =
            member.image?.url ||
            "https://readymadeui.com/team-1.webp";

          return (

            <li
              key={member._id}
              className="
                teamCard
                group
                relative
                overflow-hidden

                bg-white
                dark:bg-neutral-900

                border
                border-slate-200
                dark:border-neutral-800

                rounded-2xl

                p-2
                sm:p-3

                shadow-sm

                hover:shadow-xl
                hover:shadow-slate-200/60
                dark:hover:shadow-black/30

                hover:-translate-y-1

                transition-all
                duration-300
                ease-out
              "
            >

              {/* =================================================
                  IMAGE CONTAINER
              ================================================= */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-xl
                  bg-slate-100
                  dark:bg-neutral-800
                "
              >

                {/* =================================================
                    SPLIT IMAGE
                ================================================= */}

                <div className="teamImageReveal">

                  <div className="teamSplitImage">

                    {/* ==============================
                        PART 1
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "0% 0%",
                      }}
                    />

                    {/* ==============================
                        PART 2
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "20% 0%",
                      }}
                    />

                    {/* ==============================
                        PART 3
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "40% 0%",
                      }}
                    />

                    {/* ==============================
                        PART 4
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "60% 0%",
                      }}
                    />

                    {/* ==============================
                        PART 5
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "80% 0%",
                      }}
                    />

                    {/* ==============================
                        PART 6
                    ============================== */}

                    <div
                      className="teamImagePart"
                      style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundPosition: "100% 0%",
                      }}
                    />

                  </div>

                </div>


                {/* =================================================
                    IMAGE OVERLAY
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-transparent

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-300

                    pointer-events-none

                    z-10
                  "
                />


                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                  className="
                    absolute
                    top-2
                    right-2

                    flex
                    gap-1.5

                    p-1.5

                    rounded-xl

                    bg-white/80
                    dark:bg-neutral-900/80

                    backdrop-blur-md

                    border
                    border-white/50
                    dark:border-neutral-700

                    shadow-lg

                    opacity-0
                    translate-y-1

                    group-hover:opacity-100
                    group-hover:translate-y-0

                    transition-all
                    duration-300

                    z-20
                  "
                >

                  {/* =================================================
                      EDIT
                  ================================================= */}

                  <button
                    onClick={() => openEditDialog(member)}
                    className="
                      flex
                      items-center
                      justify-center

                      w-8
                      h-8

                      rounded-lg

                      text-blue-600
                      dark:text-blue-400

                      hover:bg-blue-100
                      dark:hover:bg-blue-900/40

                      hover:scale-105

                      transition-all
                      duration-200
                    "
                    title="Edit"
                  >

                    <FaEdit
                      className="
                        w-3.5
                        h-3.5
                      "
                    />

                  </button>


                  {/* =================================================
                      DELETE
                  ================================================= */}

                  <button
                    onClick={() =>
                      handleDelete(
                        member._id,
                        member.title
                      )
                    }
                    className="
                      flex
                      items-center
                      justify-center

                      w-8
                      h-8

                      rounded-lg

                      text-red-600
                      dark:text-red-400

                      hover:bg-red-100
                      dark:hover:bg-red-900/40

                      hover:scale-105

                      transition-all
                      duration-200
                    "
                    title="Delete"
                  >

                    <FaTrash
                      className="
                        w-3.5
                        h-3.5
                      "
                    />

                  </button>

                </div>

              </div>


              {/* =====================================================
                  CONTENT
              ===================================================== */}

              <div
                className="
                  text-center
                  px-1
                  pt-4
                  pb-2
                "
              >

                {/* =================================================
                    TITLE
                ================================================= */}

                <h3
                  className="
                    text-base
                    sm:text-lg
                    font-bold

                    teamTitleAnimation

                    text-slate-900
                    dark:text-slate-50

                    tracking-tight

                    truncate

                    transition-colors
                    duration-300

                    group-hover:text-slate-700
                    dark:group-hover:text-white
                  "
                >
                  {member.title}
                </h3>


                {/* =================================================
                    DESIGNATION
                ================================================= */}

                <p
                  className="
                    mt-1

                    text-xs
                    sm:text-sm

                    font-medium

                    teamDesignationAnimation

                    text-slate-500
                    dark:text-slate-400

                    truncate
                  "
                >
                  {member.designation}
                </p>

              </div>

            </li>

          );

        })}

      </ul>

    )}

  </div>
</section>
  {/* Dialogs */}
  <CreateTeamDialog
    open={createDialogOpen}
    onOpenChange={setCreateDialogOpen}
    isSubmitting={isSubmitting}
    onCreateTeam={handleCreate}
  />

  <EditTeamDialog
    open={editDialogOpen}
    onOpenChange={setEditDialogOpen}
    team={selectedTeam}
    isSubmitting={isSubmitting}
    onUpdateTeam={handleUpdate}
  />
</>
  );
};

export default TeamsSection;