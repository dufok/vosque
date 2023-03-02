import os
import signal
import errno

# Check if /tmp/turbod is not empty and has a subdir containing a file called "turbod.pid"
subdir = next((d for d in os.listdir("/tmp/turbod") if os.path.isdir(os.path.join("/tmp/turbod", d))), None)
print(subdir)
if subdir and os.path.exists(os.path.join("/tmp/turbod", subdir, "turbod.pid")):
    print("Found a turbod.pid file")
    # Kill the process with the PID specified in /tmp/turbod/<subdir>/turbod.pid
    with open(os.path.join("/tmp/turbod", subdir, "turbod.pid"), "r") as f:
        pid = int(f.read().strip())
        print(f"Killing process with PID {pid}")
        os.system(f"kill -9 {pid}")
    # Remove the subdir
    os.system(f"rm -rf /tmp/turbod/{subdir}")


# Get a list of all yarn processes
pids = os.popen('ps -ef | grep yarn | sed \'/grep yarn/d\' | sed \'/yarn-cheak.py/d\' | awk \'{print $2}\'').read().strip().split("\n")
print(pids)
if len(pids)==0 or (len(pids)==1 and pids[0]==""):
    print("No yarn processes found")
else:
    print("Found yarn processes")
    for pid in pids:
        print(f"Killing process with PID {pid}")
        os.kill(int(pid), signal.SIGTERM)
        
        # Wait for the process to exit gracefully
        try:
            os.waitpid(int(pid), 0)
        except OSError:
            pass

        # If the process is still running, send the SIGKILL signal
        try:
            os.kill(int(pid), 0)
            print(f"Process with PID {pid} did not exit gracefully, sending SIGKILL")
            os.kill(int(pid), signal.SIGKILL)
        except OSError as e:
            if e.errno == errno.ESRCH:
                print(f"Process with PID {pid} exited gracefully")
            else:
                print(f"Process with PID {pid} exited with error: {e}")
