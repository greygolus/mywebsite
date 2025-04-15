import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SnellsLawFormState {
  n1: string;
  n2: string;
  theta1: string;
  theta2: string;
  calculationMode: 'theta2' | 'theta1';
}

interface CriticalAngleFormState {
  n1: string;
  n2: string;
}

const AngleCalculator = () => {
  // Snell's Law form state
  const [snellsLawState, setSnellsLawState] = useState<SnellsLawFormState>({
    n1: '',
    n2: '',
    theta1: '',
    theta2: '',
    calculationMode: 'theta2',
  });
  
  // Critical Angle form state
  const [criticalAngleState, setCriticalAngleState] = useState<CriticalAngleFormState>({
    n1: '',
    n2: '',
  });
  
  // Results state
  const [snellsLawResult, setSnellsLawResult] = useState<number | null>(null);
  const [criticalAngleResult, setCriticalAngleResult] = useState<number | null>(null);
  const [isTotalInternalReflection, setIsTotalInternalReflection] = useState(false);
  const [criticalAngleExists, setCriticalAngleExists] = useState(true);
  
  // Conversion functions
  const degreesToRadians = (degrees: number) => degrees * Math.PI / 180;
  const radiansToDegrees = (radians: number) => radians * 180 / Math.PI;
  
  // Snell's Law calculation
  useEffect(() => {
    const { n1, n2, theta1, theta2, calculationMode } = snellsLawState;
    
    // Parse inputs
    const n1Value = parseFloat(n1);
    const n2Value = parseFloat(n2);
    
    // Reset results if any required value is missing
    if (isNaN(n1Value) || isNaN(n2Value)) {
      setSnellsLawResult(null);
      setIsTotalInternalReflection(false);
      return;
    }
    
    if (calculationMode === 'theta2') {
      const theta1Value = parseFloat(theta1);
      if (isNaN(theta1Value)) {
        setSnellsLawResult(null);
        setIsTotalInternalReflection(false);
        return;
      }
      
      // Check for total internal reflection
      if (n1Value > n2Value) {
        const criticalAngle = Math.asin(n2Value / n1Value);
        const theta1Radians = degreesToRadians(theta1Value);
        
        if (theta1Radians > criticalAngle) {
          setIsTotalInternalReflection(true);
          setSnellsLawResult(null);
          return;
        }
      }
      
      // Calculate theta2
      const theta1Radians = degreesToRadians(theta1Value);
      const sinTheta2 = (n1Value / n2Value) * Math.sin(theta1Radians);
      
      // Check if the result is valid (not beyond the bounds of sine)
      if (sinTheta2 <= 1 && sinTheta2 >= -1) {
        const theta2Radians = Math.asin(sinTheta2);
        const theta2Degrees = radiansToDegrees(theta2Radians);
        setSnellsLawResult(parseFloat(theta2Degrees.toFixed(2)));
        setIsTotalInternalReflection(false);
      } else {
        // If sinTheta2 > 1, it indicates total internal reflection
        setIsTotalInternalReflection(true);
        setSnellsLawResult(null);
      }
    } else { // calculationMode === 'theta1'
      const theta2Value = parseFloat(theta2);
      if (isNaN(theta2Value)) {
        setSnellsLawResult(null);
        return;
      }
      
      // Calculate theta1
      const theta2Radians = degreesToRadians(theta2Value);
      const sinTheta1 = (n2Value / n1Value) * Math.sin(theta2Radians);
      
      // Check if the result is valid (not beyond the bounds of sine)
      if (sinTheta1 <= 1 && sinTheta1 >= -1) {
        const theta1Radians = Math.asin(sinTheta1);
        const theta1Degrees = radiansToDegrees(theta1Radians);
        setSnellsLawResult(parseFloat(theta1Degrees.toFixed(2)));
        setIsTotalInternalReflection(false);
      } else {
        // This case is mathematically impossible in real optical systems
        setSnellsLawResult(null);
      }
    }
  }, [snellsLawState]);
  
  // Critical Angle calculation
  useEffect(() => {
    const { n1, n2 } = criticalAngleState;
    
    // Parse inputs
    const n1Value = parseFloat(n1);
    const n2Value = parseFloat(n2);
    
    // Reset results if any required value is missing
    if (isNaN(n1Value) || isNaN(n2Value)) {
      setCriticalAngleResult(null);
      setCriticalAngleExists(true);
      return;
    }
    
    // Check if critical angle exists (n1 must be greater than n2)
    if (n1Value <= n2Value) {
      setCriticalAngleExists(false);
      setCriticalAngleResult(null);
      return;
    }
    
    // Calculate critical angle
    const criticalAngleRadians = Math.asin(n2Value / n1Value);
    const criticalAngleDegrees = radiansToDegrees(criticalAngleRadians);
    setCriticalAngleResult(parseFloat(criticalAngleDegrees.toFixed(2)));
    setCriticalAngleExists(true);
  }, [criticalAngleState]);
  
  // Handle Snell's Law form input changes
  const handleSnellsLawInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // When in theta2 mode, clear theta2 value when other fields change
    // When in theta1 mode, clear theta1 value when other fields change
    if (snellsLawState.calculationMode === 'theta2' && name === 'theta2') {
      // Switch to theta1 mode and update form
      setSnellsLawState({
        ...snellsLawState,
        [name]: value,
        calculationMode: 'theta1',
        theta1: '',
      });
    } else if (snellsLawState.calculationMode === 'theta1' && name === 'theta1') {
      // Switch to theta2 mode and update form
      setSnellsLawState({
        ...snellsLawState,
        [name]: value,
        calculationMode: 'theta2',
        theta2: '',
      });
    } else {
      // Regular update
      setSnellsLawState({
        ...snellsLawState,
        [name]: value,
        theta2: snellsLawState.calculationMode === 'theta2' ? '' : snellsLawState.theta2,
        theta1: snellsLawState.calculationMode === 'theta1' ? '' : snellsLawState.theta1,
      });
    }
  };
  
  // Handle Critical Angle form input changes
  const handleCriticalAngleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriticalAngleState({
      ...criticalAngleState,
      [name]: value,
    });
  };
  
  // Reset form functions
  const resetSnellsLawForm = () => {
    setSnellsLawState({
      n1: '',
      n2: '',
      theta1: '',
      theta2: '',
      calculationMode: 'theta2',
    });
    setSnellsLawResult(null);
    setIsTotalInternalReflection(false);
  };
  
  const resetCriticalAngleForm = () => {
    setCriticalAngleState({
      n1: '',
      n2: '',
    });
    setCriticalAngleResult(null);
    setCriticalAngleExists(true);
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="snells-law" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="snells-law">Snell's Law</TabsTrigger>
          <TabsTrigger value="critical-angle">Critical Angle</TabsTrigger>
        </TabsList>
        
        {/* Snell's Law Calculator */}
        <TabsContent value="snells-law">
          <Card>
            <CardHeader>
              <CardTitle>Snell's Law Calculator</CardTitle>
              <CardDescription>
                Calculate how light bends at the interface between two materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Refractive indices */}
                  <div className="space-y-2">
                    <Label htmlFor="n1">Refractive Index 1 (n₁)</Label>
                    <Input 
                      id="n1" 
                      name="n1" 
                      type="number" 
                      placeholder="e.g., 1.5" 
                      value={snellsLawState.n1}
                      onChange={handleSnellsLawInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="n2">Refractive Index 2 (n₂)</Label>
                    <Input 
                      id="n2" 
                      name="n2" 
                      type="number" 
                      placeholder="e.g., 1.0" 
                      value={snellsLawState.n2}
                      onChange={handleSnellsLawInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Angles */}
                  <div className="space-y-2">
                    <Label htmlFor="theta1">
                      Incident Angle (θ₁) in degrees
                      {snellsLawState.calculationMode === 'theta1' && 
                        <span className="ml-2 text-blue-500 text-sm">(solving for this)</span>
                      }
                    </Label>
                    <Input 
                      id="theta1" 
                      name="theta1" 
                      type="number" 
                      placeholder={snellsLawState.calculationMode === 'theta1' ? "Will be calculated" : "e.g., 45"}
                      value={snellsLawState.theta1}
                      onChange={handleSnellsLawInputChange}
                      disabled={snellsLawState.calculationMode === 'theta1'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theta2">
                      Refraction Angle (θ₂) in degrees
                      {snellsLawState.calculationMode === 'theta2' && 
                        <span className="ml-2 text-blue-500 text-sm">(solving for this)</span>
                      }
                    </Label>
                    <Input 
                      id="theta2" 
                      name="theta2" 
                      type="number" 
                      placeholder={snellsLawState.calculationMode === 'theta2' ? "Will be calculated" : "e.g., 30"}
                      value={snellsLawState.theta2}
                      onChange={handleSnellsLawInputChange}
                      disabled={snellsLawState.calculationMode === 'theta2'}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-mono text-center">n₁ * sin(θ₁) = n₂ * sin(θ₂)</p>
                </div>
                
                {/* Result display */}
                <div className="space-y-4">
                  {snellsLawResult !== null && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-center">
                        {snellsLawState.calculationMode === 'theta2' ? 'Refraction Angle (θ₂)' : 'Incident Angle (θ₁)'}: {snellsLawResult}°
                      </p>
                    </div>
                  )}
                  
                  {isTotalInternalReflection && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                      <AlertDescription>
                        Total internal reflection occurs. The incident angle exceeds the critical angle, so the light is entirely reflected at the interface rather than refracting.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                {/* Reset button */}
                <Button 
                  variant="outline" 
                  onClick={resetSnellsLawForm} 
                  className="w-full"
                >
                  Reset Calculator
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Critical Angle Calculator */}
        <TabsContent value="critical-angle">
          <Card>
            <CardHeader>
              <CardTitle>Critical Angle Calculator</CardTitle>
              <CardDescription>
                Determine the angle at which total internal reflection occurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ca-n1">Incident Medium Refractive Index (n₁)</Label>
                    <Input 
                      id="ca-n1" 
                      name="n1" 
                      type="number" 
                      placeholder="e.g., 1.5" 
                      value={criticalAngleState.n1}
                      onChange={handleCriticalAngleInputChange}
                    />
                    <p className="text-xs text-gray-500">This should be the higher refractive index</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ca-n2">Exit Medium Refractive Index (n₂)</Label>
                    <Input 
                      id="ca-n2" 
                      name="n2" 
                      type="number" 
                      placeholder="e.g., 1.0" 
                      value={criticalAngleState.n2}
                      onChange={handleCriticalAngleInputChange}
                    />
                    <p className="text-xs text-gray-500">This should be the lower refractive index</p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-mono text-center">θ_c = arcsin(n₂ / n₁)</p>
                </div>
                
                {/* Result display */}
                <div className="space-y-4">
                  {criticalAngleResult !== null && criticalAngleExists && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-center">Critical Angle: {criticalAngleResult}°</p>
                      <p className="text-sm text-center mt-2">
                        Total internal reflection occurs for angles greater than this.
                      </p>
                    </div>
                  )}
                  
                  {!criticalAngleExists && criticalAngleState.n1 !== '' && criticalAngleState.n2 !== '' && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
                      <AlertDescription>
                        No critical angle exists — light always refracts. For a critical angle to exist, the incident medium (n₁) must have a higher refractive index than the exit medium (n₂).
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                {/* Reset button */}
                <Button 
                  variant="outline" 
                  onClick={resetCriticalAngleForm} 
                  className="w-full"
                >
                  Reset Calculator
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AngleCalculator;