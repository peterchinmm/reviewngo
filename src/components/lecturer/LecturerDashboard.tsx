import {
    Divider,
    Grid,
    Paper,
  } from "@mui/material";
  
  export default function LecturerDashboard() {
    return (
      <div className="flex flex-col w-full p-7">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: "full",
                justifyContent: "space-evenly",
              }}
            >
              <div className="flex flex-col justify-start py-10">
                <h1 className="font-black text-4xl">3</h1>
                <h1>Total Papers</h1>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col justify-start py-10">
                <h1 className="font-black text-4xl">2</h1>
                <h1>Papers to review</h1>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col justify-start py-10">
                <h1 className="font-black text-4xl">1</h1>
                <h1>Papers reviewed</h1>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col justify-start py-10">
                <h1 className="font-black text-4xl">0</h1>
                <h1>Workload Balance</h1>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper
              sx={{
                p: 5,
              }}
            >
              <h1 className="font-black text-2xl">Latest Announcement</h1>
              <p className="pt-10 pl-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                lacinia turpis tortor, consequat efficitur mi congue a. Curabitur
                cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus
                ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et
                suscipit gravida nunc. Sed sed est quis dui.
              </p>
            </Paper>
          </Grid>
          
        </Grid>
      </div>
    );
  }
  